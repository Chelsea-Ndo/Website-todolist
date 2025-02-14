// Import Supabase client
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = 'https://piwpbvvgovzqqnkskyek.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpd3BidnZnb3Z6cXFua3NreWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MzkzMzAsImV4cCI6MjA1NTExNTMzMH0.iPWbIVUpaPdj9fknHZEXjCO2dtjwOssxEeecNyDJ0B4';
const supabase = createClient(supabaseUrl, supabaseKey);

// DOM Elements
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const todoList = document.getElementById('todo-list');

// Fetch and display todos
async function fetchTodos() {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching todos:', error);
        return;
    }

    todoList.innerHTML = '';
    data.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task;
        todoList.appendChild(li);
    });
}

// Add new todo
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();

    if (task) {
        const { error } = await supabase
            .from('todos')
            .insert([{ task }]);

        if (error) {
            console.error('Error adding todo:', error);
        } else {
            taskInput.value = '';
            fetchTodos();
        }
    }
});

// Initial fetch
fetchTodos();