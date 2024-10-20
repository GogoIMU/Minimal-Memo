package com.example.Minimal.Memo;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
    public String saveContent(@RequestParam("content") String content, Model model) throws IOException {
        if (content == null || content.trim().isEmpty()) {
                model.addAttribute("message","内容が空です");
                    return "editor";
            }
        Files.write(Paths.get(FILE_PATH), content.getBytes());
        model.addAttribute("message", "ファイルが保存されました");
        model.addAttribute("content", content); // 保存後の内容を再表示
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