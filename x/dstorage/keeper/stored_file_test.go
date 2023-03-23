package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/dfsapp/dstorage/testutil/keeper"
	"github.com/dfsapp/dstorage/testutil/nullify"
	"github.com/dfsapp/dstorage/x/dstorage/keeper"
	"github.com/dfsapp/dstorage/x/dstorage/types"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNStoredFile(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.StoredFile {
	items := make([]types.StoredFile, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetStoredFile(ctx, items[i])
	}
	return items
}

func TestStoredFileGet(t *testing.T) {
	keeper, ctx := keepertest.DstorageKeeper(t)
	items := createNStoredFile(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetStoredFile(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestStoredFileRemove(t *testing.T) {
	keeper, ctx := keepertest.DstorageKeeper(t)
	items := createNStoredFile(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveStoredFile(ctx,
			item.Index,
		)
		_, found := keeper.GetStoredFile(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestStoredFileGetAll(t *testing.T) {
	keeper, ctx := keepertest.DstorageKeeper(t)
	items := createNStoredFile(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllStoredFile(ctx)),
	)
}
