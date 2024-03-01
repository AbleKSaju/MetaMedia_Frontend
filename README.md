# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

npm install @hookform/resolvers/zod --legacy-peer-deps



      if (file.type.startsWith("video")) {
        const data = new FormData()
        data.append("file", file);
        data.append("upload_preset" , 'videos_preset')
        data.append("timestamp", timestamp);
        data.append("signature", signature);
        try {
             // Get signature for Image upload

      // Get signature for video upload


          const cloudName="dton3lr3o"
          let resourceType='video'
          let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
          const res = await axios.post(api,data)
          console.log(res.data,"res.datares.data");
          const { secure_url } = res.data

          // await axios.post("http://localhost:3003/api/story/addStoryVideo",{secure_url})
          console.log("File upload success ...");
          setLoading(false)
        } catch (error) {
          console.log(error,"er");
        }
      } 