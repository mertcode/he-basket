<template>
    <div class="modal-container">
        <div class="modal flex-center">
            <div class="modal-message">
                {{ feedback }}
            </div>
            <div class="actions flex-center">
                <button class="btn btn-orange" @click="cancel">OK</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Modal',
        props: {
            feedback: {
                type: String,
                required: true
            }
        },
        methods: {
            cancel(){
                this.$emit('cancel')
            }
        }
    }

</script>