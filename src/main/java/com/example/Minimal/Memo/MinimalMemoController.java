package com.example.Minimal.Memo;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Controller
public class MinimalMemoController {

    private static final String FILE_PATH = "editor-content.txt";

    @GetMapping("/")
    public String editorPage(Model model) throws IOException {
        // ファイルの存在確認
        if (Files.exists(Paths.get(FILE_PATH))) {
            String content = new String(Files.readAllBytes(Paths.get(FILE_PATH)));
            model.addAttribute("content", content);
        } else {
            model.addAttribute("content", "");
        }
        return "editor";
    }


    @PostMapping("/save")
    public String saveContent(@RequestParam("filename") String filename, @RequestParam("content") String content, Model model) throws IOException {

        // 保存するファイルのパスを指定
        String filePath = System.getProperty("user.dir") + "/" + filename + ".txt";
        // ファイルを書き込み
        Files.write(Paths.get(filePath), content.getBytes());

        // 成功メッセージと内容を返す
        model.addAttribute("message", "ファイルが保存されました");
        model.addAttribute("content", content); // 保存後の内容を再表示
        return "editor";
    }

    @PostMapping("/load")
    public String loadContent(@RequestParam("file") MultipartFile file, Model model) throws IOException {
        if (!file.isEmpty()) {
            String content = new String(file.getBytes());
            model.addAttribute("content", content);
        } else {
            model.addAttribute("message", "ファイルが選択されていません");
            model.addAttribute("content", "");
        }
        return "editor";
    }

    @GetMapping("/load")
    public String loadContent(Model model) throws IOException {

            if (Files.exists(Paths.get(FILE_PATH))) {
            String content = new String(Files.readAllBytes(Paths.get(FILE_PATH)));
            model.addAttribute("content", content);
        } else {
            model.addAttribute("message", "ファイルが見つかりません");
            model.addAttribute("content", "");
        }
        return "editor";
    }
}