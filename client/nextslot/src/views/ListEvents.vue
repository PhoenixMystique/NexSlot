<template>
    <div class="container mx-auto p-6">
        <div class="flex flex-col items-start gap-6">
            <div class="w-full">
                <h1 class="text-2xl font-semibold mb-4 header-text">Select Date</h1>
                <DatePicker selectionMode="range" :manualInput="false" inline showWeek :disabledDays="[0, 6]"
                    @date-select="handleDateSelect" />
            </div>

            <div v-if="slots.length > 0" class="flex flex-col mt-4">
                <Button v-for="slot in slots" :key="slot" :label="formatSlot(slot)" @click="createEvent(slot)"
                    class="button-with-margin" />
            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';
import ApiService from '../services/api.service';

export default {
    components: {
        DatePicker,
        Button,

    },
    data() {
        return {
            slots: [],
            selectedStartDate: null,
            selectedEndDate: null,
        };
    },
    methods: {
        async handleDateSelect(value) {
            const selectedDate = new Date(value);
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            if (selectedDate < now) {
                alert("The selected date is in the past. Please select a future date.");
                return;
            }

            if (!this.selectedStartDate) {
             
                this.selectedStartDate = selectedDate;
                alert("Start date selected. Please select the end date.");
            } else if (!this.selectedEndDate) {
               
                if (selectedDate <= this.selectedStartDate) {
                    alert("The end date must be after the start date. Please select a valid end date.");
                    return;
                }
                this.selectedEndDate = selectedDate;


                const formattedStartDate = this.selectedStartDate.toLocaleDateString();
                const formattedEndDate = this.selectedEndDate.toLocaleDateString();
                alert(`Selected Date Range:\nStart Date: ${formattedStartDate}\nEnd Date: ${formattedEndDate}`);

                const payload = {
                    startDate: this.selectedStartDate.toISOString(),
                    endDate: this.selectedEndDate.toISOString(),
                };

                try {
                    let response = await ApiService.getEvents(payload);
                    response.forEach(data => {
                                this.slots.push(data.DateTime);
                            });
                } catch (error) {
                    console.error("Error fetching events:", error);
                }

                this.selectedStartDate = null;
                this.selectedEndDate = null;
            }
        },
        formatSlot(slot) {
            const date = new Date(slot);
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        },
    }

}
</script>