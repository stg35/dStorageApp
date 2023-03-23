package keeper_test

import (
	"testing"

	testkeeper "github.com/dfsapp/dstorage/testutil/keeper"
	"github.com/dfsapp/dstorage/x/dstorage/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.DstorageKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
