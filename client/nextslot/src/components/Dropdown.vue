<template>
  <div class="dropdown-container">
    <select v-model="selectedTimezone" @change="onTimezoneSelected" class="timezone-dropdown">
      <option value="" disabled>Select a timezone</option>
      <option v-for="tz in timezones" :key="tz" :value="tz">{{ tz }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  data() {
    return {
      selectedTimezone: '',
      timezones: ['GMT', 'EST', 'CST', 'PST', 'MST'],
    };
  },
  methods: {
    onTimezoneSelected() {
      console.log('Timezone selected:', this.selectedTimezone);
      this.$emit('timezone-selected', this.selectedTimezone);
    }
  }
};
</script>

<style scoped>
.dropdown-container {
  max-width: 300px;
  margin: 20px auto;
}

.timezone-dropdown {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  transition: border-color 0.3s;
}

.timezone-dropdown:hover {
  border-color: #007BFF;
}

.timezone-dropdown:focus {
  outline: none;
  border-color: #0056b3;
}
</style>
