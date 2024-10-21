// 戻るスタック と やり直しスタック
let undoStack = [];
let redoStack = [];
const MAX_STACK_SIZE = 70; // スタックの最大サイズ

document.addEventListener('DOMContentLoaded', (event) => {
    const textarea = document.querySelector('#content');
    const charCountDisplay = document.getElementById('charCount');

    // 文字数カウント初期表示
    charCountDisplay.textContent = textarea.value.length;

    // ページがロードされた時点で最初の内容を戻るスタックに入れる
    undoStack.push(textarea.value);

    // テキストエリアに入力があるたびに戻るスタックに現在の内容を保存
    textarea.addEventListener('input', () => {
        charCountDisplay.textContent = textarea.value.length; // 文字数を更新

            // タイピング音を再生
              playTypingSound();

        // スタックが最大サイズを超えないように管理
        if (undoStack.length >= MAX_STACK_SIZE) {
            undoStack.shift(); // 最も古い状態を削除
        }

        undoStack.push(textarea.value);
        redoStack = []; // 新たな入力があったらやり直しスタックをクリア
        console.log('現在の undoStack:', undoStack); // デバッグ用スタックの内容確認
    });
});

// undo 関数
function undo() {
    console.log('Undo button clicked'); // ボタンクリックを確認
    if (undoStack.length > 1) { // 少なくとも1つ前の状態がある場合
        redoStack.push(undoStack.pop()); // 戻るスタックから一つ前を取り出しやり直しスタックに入れる
        document.querySelector('#content').value = undoStack[undoStack.length - 1];
        // 一つ前の内容に戻す
        console.log('現在の redoStack:', redoStack); // デバッグ用スタックの内容確認
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
        console.log('現在の undoStack:', undoStack); // デバッグ用
    }
}

document.getElementById('undo-button').addEventListener('click', undo);
document.getElementById('redo-button').addEventListener('click', redo);

// フォント変更ボタンのクリックでフォント選択を表示/非表示にする関数
function toggleFontSelector() {
    const fontSelector = document.getElementById('fontSelector');
    fontSelector.style.display = fontSelector.style.display === 'none' ? 'block' : 'none';
}

// フォントを変更する関数
function changeFont() {
    const textarea = document.querySelector('#content');
    const selectedFont = document.getElementById('fontSelect').value;
    textarea.style.fontFamily = selectedFont; // テキストエリアのフォントを変更
}


// ファイルを保存する関数
function saveFile() {
    const textarea = document.querySelector('#content');
    const content = textarea.value;
    const filename = prompt("ファイル名を入力してください", "default.txt"); // ユーザーにファイル名を入力させる

    // ファイル名が指定されていない場合は処理を中止
    if (!filename) return;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // a要素を作成してダウンロードリンクを作成
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.txt') ? filename : filename + '.txt'; // 拡張子をチェックして追加
    document.body.appendChild(a);
    a.click(); // ダイアログを表示
    document.body.removeChild(a); // 使い終わったら要素を削除
    URL.revokeObjectURL(url); // URLを解放
}

        // セーブボタンにイベントリスナーを追加
        document.getElementById('save-button').addEventListener('click', (event) => {
            event.preventDefault(); // フォームの送信を防止
            saveFile(); // ファイル保存関数を呼び出し
        });

        // 他の関数の定義（loadFile, undo, redoなど）もここに追加

function loadFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt';
    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('content').value = e.target.result;
        };
        reader.readAsText(file);
    };
    fileInput.click();
}

// ダークモード用関数
function toggleDarkMode() {
    const body = document.body;
    const textarea = document.getElementById('content');
    const buttonArea = document.querySelector('.button-area');

    body.classList.toggle('dark-mode'); // ボディにダークモードクラスを切り替え
    textarea.classList.toggle('dark-mode'); // テキストエリアにダークモードクラスを切り替え
    buttonArea.classList.toggle('dark-mode'); // ボタンエリアにダークモードクラスを切り替え
}

// テキストエリアと行番号エリアの取得
const textArea = document.getElementById("content");
const lineNumbers = document.getElementById("lineNumbers");

// テキストエリアの行番号を更新する関数
function updateLineNumbers() {
    const textLines = textArea.value.split("\n");

    let lineNumberHTML = "";
    for (let i = 1; i <= textLines.length; i++) {
        lineNumberHTML += i + '<br>';
    }
    lineNumbers.innerHTML = lineNumberHTML;
}

// テキストエリアの内容が変更された時に行番号を更新
textArea.addEventListener("input", updateLineNumbers);

// スクロール同期
function syncScroll() {
    lineNumbers.scrollTop = textArea.scrollTop;
}

// 行番号表示の切り替え機能
function toggleLineNumbers() {
    const isHidden = lineNumbers.style.display === 'none';
    if (isHidden) {
        lineNumbers.style.display = 'block';
        updateLineNumbers();
    } else {
        lineNumbers.style.display = 'none';
    }
}

// 初期表示
window.onload = function() {
    updateLineNumbers();
};


// フォント選択ボックスの表示位置を調整
    function toggleFontSelector() {
        const fontSelector = document.getElementById('fontSelector');
        const fontButton = document.getElementById('font-button');
        const rect = fontButton.getBoundingClientRect(); // ボタンの位置を取得

        fontSelector.style.top = (rect.bottom + window.scrollY) + 'px'; // ボタンの下に表示
        fontSelector.style.left = (rect.left + window.scrollX) + 'px'; // ボタンの左に合わせる

        fontSelector.style.display = fontSelector.style.display === 'block' ? 'none' : 'block';
    }

let isMuted = false; // ミュート状態を管理する変数

function toggleTypingSound() {
    const typingSound = document.getElementById('typing-sound');
    const muteButton = document.getElementById('mute-button');

    isMuted = !isMuted; // 状態を切り替える

    if (isMuted) {
        muteButton.innerHTML = '<img src="/images/mute.png" alt="Unmute Typing Sound">'; // ミュート状態のアイコン
    } else {
        muteButton.innerHTML = '<img src="/images/unmute.png" alt="Mute Typing Sound">'; // アンミュート状態のアイコン
    }
}

// タイピング音を再生する関数
function playTypingSound() {
    const typingSound = document.getElementById('typing-sound');
    if (!isMuted) {
        typingSound.currentTime = 0; // 音を最初から再生
        typingSound.play();
    }
}


