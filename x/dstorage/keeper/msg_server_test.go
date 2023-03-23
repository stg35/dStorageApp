package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/dfsapp/dstorage/testutil/keeper"
	"github.com/dfsapp/dstorage/x/dstorage/keeper"
	"github.com/dfsapp/dstorage/x/dstorage/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.DstorageKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
