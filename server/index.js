const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    MaxAge: 3600,
    optionSuccessStatus: 204
}));
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

const Todos = [
    {
        id: 1,
        title: 'Apple',
        completed: true
    },
    {
        id: 2,
        title: 'Orange',
        completed: false
    },
    {
        id: 3,
        title: 'Pineapple',
        completed: false
    },
    {
        id: 4,
        title: 'Banana',
        completed: false
    },
    {
        id: 5,
        title: 'Mango',
        completed: false
    },
    {
        id: 6,
        title: 'Grapes',
        completed: false
    },
    {
        id: 7,
        title: 'Watermelon',
        completed: false
    },
    {
        id: 8,
        title: 'Strawberry',
        completed: false
    },
    {
        id: 9,
        title: 'Cherry',
        completed: false
    },
    {
        id: 10,
        title: 'Peach',
        completed: false
    }
]

app.get('/api/todos', (req, res) => {
    res.json(Todos);
}
)

app.get('/api/todos/:id', (req, res) => {
    const todo = Todos.find(todo => todo.id === parseInt(req.params.id));
    if (!todo) res.status(404).send('The todo with the given ID was not found.');
    res.send(todo);
}
)

app.post('/api/todos', (req, res) => {
    console.log(req.body);
    const todo = {
        id: Todos.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    }
    Todos.push(todo);
    res.send(todo);
}
)



app.put('/api/todos/:id', (req, res) => {
    const todo = Todos.find(todo => todo.id === parseInt(req.params.id));
    if (!todo) res.status(404).send('The todo with the given ID was not found.');

    todo.title = req.body.title;
    todo.completed = req.body.completed;

    res.send(todo);
}
)

app.delete('/api/todos/:id', (req, res) => {
    const todo = Todos.find(todo => todo.id === parseInt(req.params.id));
    if (!todo) res.status(404).send('The todo with the given ID was not found.');

    const index = Todos.indexOf(todo);
    Todos.splice(index, 1);

    res.send(todo);
}
)
