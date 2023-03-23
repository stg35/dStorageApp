package keeper

import (
	"github.com/dfsapp/dstorage/x/dstorage/types"
)

var _ types.QueryServer = Keeper{}
