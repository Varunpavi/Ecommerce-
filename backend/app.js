const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello, this is Node.js!' });
});
app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
