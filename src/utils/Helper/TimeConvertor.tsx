import React from 'react'

const TimeConvertor = (utcTimestamp: any) => {
    return new Promise<string>((resolve, reject) => {
        // Create a Date object from the UTC timestamp
        const date = new Date(utcTimestamp);
    
        // Get the UTC hours and minutes
        const utcHours = date.getUTCHours();
        const utcMinutes = date.getUTCMinutes();
    
        // Indian Standard Time (IST) is UTC + 5 hours and 30 minutes
        const istHours = utcHours + 5;
        const istMinutes = utcMinutes + 30;
    
        // Adjust for overflow or underflow
        let adjustedHours = istHours % 24;
        let adjustedMinutes = istMinutes % 60;
    
        // Convert negative values to positive
        if (adjustedHours < 0) adjustedHours += 24;
        if (adjustedMinutes < 0) adjustedMinutes += 60;
    
        // Format the time as HH:mm
        const formattedTime = `${adjustedHours < 10 ? '0' : ''}${adjustedHours}:${adjustedMinutes < 10 ? '0' : ''}${adjustedMinutes}`;
    
        // Resolve the promise with the formatted time
        resolve(formattedTime);
    });
};


export default TimeConvertor