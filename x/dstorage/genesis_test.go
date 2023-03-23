package dstorage_test

import (
	"testing"

	keepertest "github.com/dfsapp/dstorage/testutil/keeper"
	"github.com/dfsapp/dstorage/testutil/nullify"
	"github.com/dfsapp/dstorage/x/dstorage"
	"github.com/dfsapp/dstorage/x/dstorage/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		SystemInfo: types.SystemInfo{
			NextId: 91,
		},
		StoredFileList: []types.StoredFile{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.DstorageKeeper(t)
	dstorage.InitGenesis(ctx, *k, genesisState)
	got := dstorage.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.Equal(t, genesisState.SystemInfo, got.SystemInfo)
	require.ElementsMatch(t, genesisState.StoredFileList, got.StoredFileList)
	// this line is used by starport scaffolding # genesis/test/assert
}
