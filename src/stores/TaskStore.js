import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [
            {id: 1, title: "Do a cool thing", isFav: true},
            {id: 2, title: "Do another cool thing", isFav: false},
        ], // if json-server worked, this would be empty and loaded using getTasks()
        isLoading: false
    }),
    getters: {
        favs() {
            return this.tasks.filter(t => t.isFav)
        },
        favCount() {
            return this.tasks.reduce((p, c) => {
                return c.isFav ? p + 1 : p
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        async getTasks() {
            this.isLoading = true;

            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()

            this.tasks = data

            this.isLoading = false;
        },
        addTask(task) {
            this.tasks.push(task)
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })
        },
        toggleFav(id) {
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav
        },
        async addTaskAsync(task) {
            this.tasks.push(task)

            const res = await fetch('http://localhost:3000/tasks', {
              method: 'POST',
              body: JSON.stringify(task),
              headers: {'Content-Type': 'application/json'}
            })
      
            if (res.error) {
              console.log(res.error)
            }
        },
        async deleteTaskAsync(id) {
            this.tasks = this.tasks.filter(t => {
              return t.id !== id
            })
      
            const res = await fetch('http://localhost:3000/tasks/' + id, {
              method: 'DELETE',
            })
      
            if (res.error) {
              console.log(res.error)
            }
        },
        async toggleFavAsync(id) {
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav
        
            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task.isFav }),
                headers: {'Content-Type': 'application/json'}
            })
        
            if (res.error) {
                console.log(res.error)
            }
        }
    }
})