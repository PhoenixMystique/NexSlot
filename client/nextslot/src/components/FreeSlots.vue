<template>
  <div class="container mx-auto p-6">
    <div class="flex flex-col md:flex-row justify-between items-start gap-6">
      <div class="w-full md:w-1/3">
        <h1 class="text-2xl font-semibold mb-4 header-text">Book Event</h1>
        <DatePicker electionMode="multiple" inline showWeek :disabledDays="[0, 6]" @date-select="handleDateSelect"
          class="mb-4" />
      </div>

      <div class="w-full md:w-2/3 space-y-4">
        <div class="flex items-center space-x-2">
          <label for="duration" class="w-48 font-medium label-text">Minute Duration:</label>
          <InputNumber v-model="duration" id="duration" :min="0" :max="1440" :useGrouping="false" prefix="Duration: "
            class="w-full button-primary-border" />
        </div>

        <div class="flex items-center space-x-2">
          <label for="timezone" class="w-48 font-medium label-text">Timezone:</label>
          <SelectButton v-model="selectedTimezone" :options="timezones" optionLabel="label"
            class="w-full md:w-56 button-primary-border" />
        </div>

        <div class="flex justify-center">
          <Button label="Get Free Slots" icon="pi pi-calendar" :loading="loading" @click="getFreeSlots"
            class="button-primary" severity="success" />
        </div>

        <div class="flex flex-col mt-4">
          <Button v-for="slot in slots" :key="slot" :label="formatSlot(slot)" @click="createEvent(slot)"
            class="button-with-margin" />
        </div>

      </div>
    </div>
  </div>
</template>



<script>
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import ApiService from '../services/api.service';
import '../assets/styles.css';

export default {
  components: {
    DatePicker,
    InputNumber,
    SelectButton,
    Button
  },
  data() {
    return {
      slots: [],
      selectedRange: null,
      selectedTimezone: { label: 'UTC', value: 'UTC' }, 
      duration: 30,
      timezones: [
        { label: 'UTC', value: 'UTC' },
        { label: 'New York', value: 'America/New_York' },
        { label: 'London', value: 'Europe/London' },
        { label: 'Tokyo', value: 'Asia/Tokyo' },
        { label: 'Sydney', value: 'Australia/Sydney' }
      ],
      loading: false
    }
  },
  methods: {
    handleDateSelect(value) {
      const date = new Date(value);
      const formattedDate = date.toLocaleDateString('en-CA');
      this.selectedRange = formattedDate;
    },
    async getFreeSlots() {
      if (!this.selectedRange || !this.selectedTimezone) {
        alert("Please select a date range and timezone.");
        return;
      }
      this.loading = true;
      try {
        const payload = {
          dateTime: this.selectedRange,
          timezone: this.selectedTimezone.value
        };
        const response = await ApiService.getFreeSlots(payload);
        this.slots = response;
      } catch (error) {
        console.error("Failed to fetch free slots:", error);
        alert("An error occurred while fetching free slots.");
      } finally {
        this.loading = false;
      }
    },
    async createEvent(slot) {
      try {
        const eventPayload = {
          dateTime: new Date(slot).toISOString(),
          timezone: this.selectedTimezone?.value || 'UTC',
          duration: this.duration
        };
        try {
          await ApiService.createEvent(eventPayload);
          alert("Event successfully created.");
        } catch (error) {
          alert("Failed to create event. Please try again.");
        }
        this.getFreeSlots();
      } catch (error) {
        console.error("Failed to create event:", error);
        alert("An error occurred while creating the event.");
        this.getFreeSlots();
      }
    },
    formatSlot(slot) {
      const date = new Date(slot);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
}
</script>
