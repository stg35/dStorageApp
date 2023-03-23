package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCreateFile = "create_file"

var _ sdk.Msg = &MsgCreateFile{}

func NewMsgCreateFile(creator string, content string, format string, name string) *MsgCreateFile {
	return &MsgCreateFile{
		Creator: creator,
		Content: content,
		Format:  format,
		Name: name,
	}
}

func (msg *MsgCreateFile) Route() string {
	return RouterKey
}

func (msg *MsgCreateFile) Type() string {
	return TypeMsgCreateFile
}

func (msg *MsgCreateFile) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateFile) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateFile) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
