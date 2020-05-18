

# vscode

# [VSCode中tab自动补全html代码设置](https://www.cnblogs.com/liuafan/p/11540120.html)

进入vscode里面 => 文件 => 首选项 => 设置=> 工作台=> 外观 => 在settings.json中编辑 进入编辑状态

```
// 添加这个之后保存即可
{
    "emmet.triggerExpansionOnTab":true
}
```

# VSCode代码自动换行设置

File>>Preferences>>settings>>UserSettings>>CommonlyUsed>>找到Editor:WordWrap,将off修改为on即可

# VSCode快捷键

Alt + up/down 移动行上下 

Shift + Alt up/down 在当前行上下复制当前行

Ctrl + Enter 在当前行下插入新的一行

Ctrl + Shift + Enter 在当前行上插入新的一行

Ctrl + ] 或 [ 行缩进 

Ctrl + k+0 折叠所有代码

Ctrl + k+j 展开所有代码

Ctrl + k+l 展开或者展开当前区域代码

Home 光标跳转到行头

End 光标跳转到行尾

Ctrl + Home 跳转到页头

Ctrl + End 跳转到页尾

Ctrl + b  展开折叠目录



# settings.json

```json
{
    "workbench.iconTheme": "vscode-icons",
    "files.autoSave": "afterDelay",
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    "editor.renderIndentGuides": false,
    "diffEditor.ignoreTrimWhitespace": false,
    "sync.gist": "2737e388e7303e054dfee9939e5afb8e",
    "todo-tree.highlights.enabled": true,
    "vsicons.dontShowNewVersionMessage": true,
    "editor.fontSize": 18,
    "editor.tabSize": 2,
    "vetur.format.options.tabSize": 2,
    "vetur.format.options.useTabs": true,
    "vetur.format.defaultFormatterOptions": {
        "prettyhtml": {
            "printWidth": 150, // 单行html不超过150
            "singleQuote": false // 更喜欢用双引号
          },
        "prettier": {
            "semi": false, //不加分号
            "singleQuote": true //用单引号
        }
    },
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
    },
    // 使用vscode的自动格式化时，有时会把一行过长的代码折行。400表示400个字符处折行
    "editor.wordWrapColumn": 400,
    // 格式化粘贴到文件内的内容
    "editor.formatOnPaste": false,
    "emmet.triggerExpansionOnTab": true,
    "editor.wordWrap": "on", //tab自动补全html代码
}
```





# setting-sync

```
key:  0853648f87b91da63da7d02c9700030ca49dd1ee

id ：  2737e388e7303e054dfee9939e5afb8e
```





# 快捷键

## 查找替换

1. 查找 `Ctrl+F`
2. 查找替换 `Ctrl+H`
3. 整个文件夹中查找 `Ctrl+Shift+F`

## 格式化

 Shift + Alt + F  

## 下面插入一行

ctrl + enter

## 下面插入一行

ctrl + Shift +enter



## 快速注释 Document This

ctrl + alt + D



## TODO

// TODO list