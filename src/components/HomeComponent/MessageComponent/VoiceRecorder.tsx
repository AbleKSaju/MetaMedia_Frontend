import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';


const VoiceRecorder = ({ onRecordingComplete,setRecordedAudioBlob }: any) => {
   
   

    const addAudioElement = (blob: any) => {
       
        setRecordedAudioBlob(blob);
        onRecordingComplete(blob); 
    };

   

    return (
        <>
           
                <AudioRecorder
                    onRecordingComplete={addAudioElement}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                    }}
                    downloadOnSavePress={false}
                    showVisualizer={true}
                    downloadFileExtension="mp3"
                />
            

           
        </>
    );
}

export default VoiceRecorder;
