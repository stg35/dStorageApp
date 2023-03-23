package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/dfsapp/dstorage/x/dstorage/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdCreateFile() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-file [content] [format] [name]",
		Short: "Broadcast message createFile",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argContent := args[0]
			argFormat := args[1]
			argName := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateFile(
				clientCtx.GetFromAddress().String(),
				argContent,
				argFormat,
				argName,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
