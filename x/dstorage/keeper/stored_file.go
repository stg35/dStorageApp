package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/dfsapp/dstorage/x/dstorage/types"
)

// SetStoredFile set a specific storedFile in the store from its index
func (k Keeper) SetStoredFile(ctx sdk.Context, storedFile types.StoredFile) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredFileKeyPrefix))
	b := k.cdc.MustMarshal(&storedFile)
	store.Set(types.StoredFileKey(
		storedFile.Index,
	), b)
}

// GetStoredFile returns a storedFile from its index
func (k Keeper) GetStoredFile(
	ctx sdk.Context,
	index string,

) (val types.StoredFile, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredFileKeyPrefix))

	b := store.Get(types.StoredFileKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveStoredFile removes a storedFile from the store
func (k Keeper) RemoveStoredFile(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredFileKeyPrefix))
	store.Delete(types.StoredFileKey(
		index,
	))
}

// GetAllStoredFile returns all storedFile
func (k Keeper) GetAllStoredFile(ctx sdk.Context) (list []types.StoredFile) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredFileKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.StoredFile
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
