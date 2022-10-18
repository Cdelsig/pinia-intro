<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <task-form />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>

    <div class="loading" v-if="taskStore.isLoading">Loading tasks...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>All Tasks: {{ taskStore.totalCount }}</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <task-details :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>Fav Tasks: {{ taskStore.favCount }}</p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <task-details :task="task" />
      </div>
    </div>

  </main>
</template>

<script>
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { useTaskStore } from './stores/TaskStore'
export default {
  components: {
    TaskDetails,
    TaskForm
  },
  setup () {
    const taskStore = useTaskStore();

    //fetch tasks
    //taskStore.getTasks() // won't work, wrong version of node
    // uses json-server: npm install -g json-server
    // then: json-server -w ./data/db.json  <-- creates endpoints based on db schema

    const filter = ref('all')

    return { taskStore, filter }
  }
}

</script>
