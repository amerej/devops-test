<template>
  <div class="about">
    <h1>This is an about page</h1>
    <form>
      <label>Enter your index:</label>
      <input v-model="index" />
      <button @click="submit">Submit</button>
      <h3>Indexes I have seen:</h3>
      {{ seenIndexes }}
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      seenIndexes: [],
      values: {},
      index: null
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const seenIndexes = await axios({url: '/api/values/all', method: 'GET'})
        this.seenIndexes = seenIndexes.data
      } catch (e) {
        // eheh
      }
    },
    async submit() {
      const { index } = this
      await axios({url: '/api/values', data: { index }, method: 'POST'})
      this.index = null
    }
  }
}
</script>
