package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/dfsapp/dstorage/x/dstorage/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) StoredFileAll(c context.Context, req *types.QueryAllStoredFileRequest) (*types.QueryAllStoredFileResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var storedFiles []types.StoredFile
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	storedFileStore := prefix.NewStore(store, types.KeyPrefix(types.StoredFileKeyPrefix))

	pageRes, err := query.Paginate(storedFileStore, req.Pagination, func(key []byte, value []byte) error {
		var storedFile types.StoredFile
		if err := k.cdc.Unmarshal(value, &storedFile); err != nil {
			return err
		}

		storedFiles = append(storedFiles, storedFile)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllStoredFileResponse{StoredFile: storedFiles, Pagination: pageRes}, nil
}

func (k Keeper) StoredFile(c context.Context, req *types.QueryGetStoredFileRequest) (*types.QueryGetStoredFileResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetStoredFile(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetStoredFileResponse{StoredFile: val}, nil
}
