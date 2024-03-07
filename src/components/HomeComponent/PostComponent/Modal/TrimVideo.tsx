import { BigPlayButton, ControlBar, LoadingSpinner, Player, PlayToggle } from "video-react"
import "video-react/dist/video-react.css"
import { useEffect, useState } from "react"

export function VideoPlayer({
    src,
    onPlayerChange = () => {},
    onChange = () => {},
    startTime = undefined,
}:any) {
    const [player, setPlayer]:any = useState(null)
    const [playerState, setPlayerState]:any = useState(null)

    useEffect(() => {
        if (playerState) {
            onChange(playerState)
        }
    }, [playerState])

    useEffect(() => {
        onPlayerChange(player)

        if (player) {
            player.subscribeToStateChange(setPlayerState)
        }
    }, [player])

    return (
        <div className={"video-player"}>
            <Player
                ref={(player:any) => {
                    setPlayer(player)
                }}
                startTime={startTime}
            >
                <source src={src} />
                <BigPlayButton position="center" />
                <LoadingSpinner />
                <ControlBar autoHide={false} disableDefaultControls={true}>
                    <PlayToggle />
                </ControlBar>
            </Player>
        </div>
    )
}
