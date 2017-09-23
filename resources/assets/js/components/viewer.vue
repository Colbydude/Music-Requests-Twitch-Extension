<template>
    <div>
        <div class="container-fluid">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#request-modal"><span class="fa fa-music"></span></button>
        </div>

        <div class="modal fade" id="request-modal" tabindex="-1" role="dialog" aria-labelledby="request-modal-label">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="request-modal-label">Request A Song!</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <request-form></request-form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>
