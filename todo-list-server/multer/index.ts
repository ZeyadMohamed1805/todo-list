import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(__dirname, '../uploads/todo-icons');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/todo-icons/');
    },
    filename: (req, file, cb) => {
        const todoListId = req.params.todoListId;
        const ext = path.extname(file.originalname) || '.png';
        cb(null, `todo-${todoListId}${ext}`);
    }
});

export const upload = multer({ storage });
