# Olufy Frontend

> Olufy Frontend (React + Vite + vite-plugin-ssr)

## Build Setup

###User
```bash
# Go to directory user for development
$ cd packages/user/

# install dependencies
$ yarn

# init locales
$ yarn lingui

# serve with hot reload at localhost:3000 | localhost:3001
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn server:prod
```

###Admin
```bash
# Go to directory user for development
$ cd packages/admin/

# install dependencies
$ yarn

# init locales
$ yarn lingui

# serve with hot reload at localhost:3000 | localhost:3001
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn server:prod
```

For detailed explanation on how things work, checkout [vite-plugin-ssr docs](https://vite-plugin-ssr.com/).

# Stacks and Frameworks

**React.js**
เป็น Frontend Framework ที่เป็นตัวขับเคลื่อนหลักในโปรเจคนี้ และยังมี Learning Curve ที่ไม่สูงมากนัก (มั้งนะ) [อ่านเพิ่มเติม](https://react.dev)

**Vite**
เป็น Generation Tooling และตัว runtime สำหรับ run และ build ให้กับตัวกับตัว React.js ซึ่งข้อดีตัวนี้ช่วยให้การ run และ build ไวขึ้นจากเดิมมากๆ [อ่านเพิ่มเติม](https://vitejs.dev)

**vite-plugin-ssr**
เป็นตัวเสริมให้กับ Vite อีกที เพื่อให้ตัว React.js สามารถทำ Server-Side Rendering ได้ [อ่านเพิ่มเติม](https://vite-plugin-ssr.com)

# Libraries

**Lingui**
**Lingui** เป็น lib ที่ใช้ในการแปลงภาษา [Lingui Documentation](https://lingui.dev/)

**Lodash.js**
**Lodash** เป็น Lib ที่รวบรวม Functions ที่ใช้บ่อยในการเขียนโปรแกรม เช่น Function ในการจัดการ Array, String, Number, Collections, Loop [Lodash Documentation](https://lodash.com/docs)

**‌Axios**
**Axios** เป็น Lib เดียวในโปรเจคที่เอาไว้ใช้ติดต่อกับ Backend's APIs โดยในโปรเจคนี้จะใช้ Axios ผ่าน Base Class

**zustand**
**zustand** คือ Lib ที่ใช้จัดการ State เหมือน redux [Github](https://github.com/pmndrs/zustand)

# Project Structure

รายละเอียดโครงสร้างของโปรเจคโดยรวมแบบคร่าวๆ

    ├── public # เอาไว้เก็บไฟล์ static 

    ├── src

    │   ├── assets # เอาไว้เก็บ images และ icons

    │   ├── constants # เอาไว้เก็บตัวแปลคงที่ และ configs ต่างๆ

    │   ├── enums

    │   ├── hooks # เอาไว้เก็บ react hooks เพื่อเรียกใช้ได้สะดวก

    │   ├── layouts # เก็บไฟล์ Layouts ต่างๆของเว็บ

    │   ├── libs # เก็บ Custom หรือ init lib ต่างๆ เช่น axios และ firebase เป็นต้น

    │   ├── pages # จัดการ Routing ของแต่ละ Page

    │   ├── renderer # เก็บตัว provider และ render config ต่างๆ

    │   ├── server # เก็บคำสั่ง runtime ต่างๆ ที่ใช้ในการ run website

    │   ├── services # จัดการติดต่อ APIs

    │   ├── stores # เก็บตัว global state

    │   ├── styles # เอาไว้เก็บพวกไฟล์ Stylesheets เช่น *.css, *.scss

    │   ├── types # เก็บ typescript

    │   ├── i18n.ts # config ของตัวแปลงภาษา

    │   └── vite-env.d.ts # vite type

    ├── .babelrc

    ├── .eslintrc.cjs # javascript & typescirpt linter

    ├── .gitignore # 

    ├── .linguirc # config ของตัว lingui สำหรับการ build

    ├── package.json # รายการ Dependencies, Run and build config

    ├── postcss.config.cjs

    ├── prettier.config.cjs # ตัว check formatter ของ code

    ├── tailwind.config.cjs # config ของ tailwind

    ├── tsconfig.json

    ├── tsconfig.node.json

    ├── vite.config.cts # vite config
