<template>
    <div id="extension-overlay">
        <div class="modal-shim" v-if="modalActive">
            <div class="modal">
                <div class="modal-title">Request A Song</div>
                <div class="modal-footer">
                    <button class="btn btn-transparent" @click="toggleModal">Cancel</button>
                </div>
            </div>
        </div>

        <div class="btn-container">
            <button class="btn btn-blue-dark btn-menu" @click="toggleModal">
                <i class="fas fa-fw fa-times" v-if="modalActive"></i>
                <i class="fas fa-fw fa-music" v-else></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                modalActive: false
            };
        },

        methods: {
            /**
             * Toggles the modal being active.
             *
             * @return {void}
             */
            toggleModal () {
                this.modalActive = !this.modalActive;
            }
        }
    }
</script>
