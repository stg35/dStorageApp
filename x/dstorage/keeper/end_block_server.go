package keeper

import (
	"context"
	"strconv"

	f "github.com/dfsapp/dstorage/x/dstorage/file_manage"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) SaveNewFilesInStorage(goCtx context.Context) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	systemInfo, found := k.GetSystemInfo(ctx)
	if !found {
		panic("SystemInfo not found")
	}

	for _, index := range systemInfo.NewFileIds {
		storedFile, found := k.GetStoredFile(ctx, strconv.FormatUint(index, 10))
		if !found {
			panic("Cannot find new file")
		}
		f.CreateFile("./storage/",
			storedFile.Content, storedFile.Format, storedFile.Name)
	}

	systemInfo.NewFileIds = []uint64{}
	k.SetSystemInfo(ctx, systemInfo)
}
