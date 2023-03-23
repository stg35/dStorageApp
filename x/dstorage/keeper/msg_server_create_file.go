package keeper

import (
	"context"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/dfsapp/dstorage/x/dstorage/types"
)

func (k msgServer) CreateFile(goCtx context.Context, msg *types.MsgCreateFile) (*types.MsgCreateFileResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	systemInfo, found := k.Keeper.GetSystemInfo(ctx)
	if !found {
		panic("System info not found")
	}
	newIndex := strconv.FormatUint(systemInfo.NextId, 10)

	storedFile := types.StoredFile{
		Index: newIndex,
		Content: msg.Content,
		Format: msg.Format,
		Name: msg.Name,
	}

	k.Keeper.SetStoredFile(ctx, storedFile)

	systemInfo.NewFileIds = append(systemInfo.NewFileIds, systemInfo.NextId)

	systemInfo.NextId++
	k.Keeper.SetSystemInfo(ctx, systemInfo)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(types.FileCreatedEventType,
			sdk.NewAttribute(types.FileCreatedEventCreator, msg.Creator),
			sdk.NewAttribute(types.FileCreatedEventFileIndex, newIndex),
			sdk.NewAttribute(types.FileCreatedEventContent, msg.Content),
			sdk.NewAttribute(types.FileCreatedEventFormat, msg.Format),
			sdk.NewAttribute(types.FileCreatedEventName, msg.Name),
		),
	)

	return &types.MsgCreateFileResponse{}, nil
}
