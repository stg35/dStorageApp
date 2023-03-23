package dstorage

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/dfsapp/dstorage/x/dstorage/keeper"
	"github.com/dfsapp/dstorage/x/dstorage/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set if defined
	k.SetSystemInfo(ctx, genState.SystemInfo)
	// Set all the storedFile
	for _, elem := range genState.StoredFileList {
		k.SetStoredFile(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	// Get all systemInfo
	systemInfo, found := k.GetSystemInfo(ctx)
	if found {
		genesis.SystemInfo = systemInfo
	}
	genesis.StoredFileList = k.GetAllStoredFile(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
