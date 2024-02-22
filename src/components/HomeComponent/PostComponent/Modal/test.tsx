function base64StringToFormDataImageFile(croppedImage:any, fileName:any, fileType:any) {
    croppedImage = croppedImage.replace(/^data:image\/\w+;base64,/, "");
    const byteCharacters = atob(croppedImage);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: fileType });
    const formData = new FormData();
    formData.append("image", blob, fileName);
    return formData;
}