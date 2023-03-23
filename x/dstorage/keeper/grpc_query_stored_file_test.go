package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "github.com/dfsapp/dstorage/testutil/keeper"
	"github.com/dfsapp/dstorage/testutil/nullify"
	"github.com/dfsapp/dstorage/x/dstorage/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestStoredFileQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.DstorageKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNStoredFile(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetStoredFileRequest
		response *types.QueryGetStoredFileResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetStoredFileRequest{
				Index: msgs[0].Index,
			},
			response: &types.QueryGetStoredFileResponse{StoredFile: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetStoredFileRequest{
				Index: msgs[1].Index,
			},
			response: &types.QueryGetStoredFileResponse{StoredFile: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetStoredFileRequest{
				Index: strconv.Itoa(100000),
			},
			err: status.Error(codes.NotFound, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.StoredFile(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}

func TestStoredFileQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.DstorageKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNStoredFile(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllStoredFileRequest {
		return &types.QueryAllStoredFileRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.StoredFileAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.StoredFile), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.StoredFile),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.StoredFileAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.StoredFile), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.StoredFile),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.StoredFileAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.StoredFile),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.StoredFileAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
