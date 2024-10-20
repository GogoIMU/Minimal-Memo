
// 戻るスタック と やり直しスタック
let undoStack = [];
let redoStack = [];

document.addEventListener('DOMContentLoaded', (event) => {
    const textarea = document.querySelector('#content');

    // ページがロードされた時点で最初の内容を戻るスタックに入れる
    undoStack.push(textarea.value);

    // テキストエリアに入力があるたびに戻るスタックに現在の内容を保存
    textarea.addEventListener('input', () => {
        undoStack.push(textarea.value);
        redoStack = []; // 新たな入力があったらやり直しスタックをクリア
        console.log('現在の undoStack:', undoStack) //デバック用スタックの内容確認
    });
});

// undo 関数
function undo() {
    console.log('Undo button clicked'); // ボタンクリックを確認
    if (undoStack.length > 1) { // 少なくとも1つ前の状態がある場合
        redoStack.push(undoStack.pop()); // 戻るスタックから一つ前を取り出しやり直しスタックに入れる
        document.querySelector('#content').value = undoStack[undoStack.length - 1];
        // 一つ前の内容に戻す
        console.log('現在の redoStack:', redoStack) //デバック用スタックの内容確認
    }
}

// redo 関数
function redo() {
    console.log('Redo button clicked'); // ボタンクリックを確認
    if (redoStack.length > 0) { // やり直し可能な履歴がある場合
        const textarea = document.querySelector('#content');
        const redoContent = redoStack.pop(); // やり直しスタックから元に戻す内容を取得
        textarea.value = redoContent;
        undoStack.push(redoContent); // 戻るスタックにも内容を保存
        console.log('現在の undoStack:', undoStack); // デバック用
    }
}


document.getElementById('undo-button').addEventListener('click', undo);
document.getElementById('redo-button').addEventListener('click', redo);
