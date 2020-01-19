<template>
  <div class="image-uploader">
    <b-field>
      <b-upload
        ref="upload"
        v-model="image"
        @input="imageToBase64"
        accept="image/*"
      >
        <div v-if="base64Image === null" class="image-uploader__field">
          <i class="ri-user-3-line" />
          <p>Adicionar uma foto</p>
        </div>

        <div v-else class="image-uploader__field done">
          <img :src="base64Image" />
        </div>
      </b-upload>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'image-uploader',
  props: {
    userImage: String
  },
  data() {
    return {
      image: null,
      base64Image: null,
    }
  },
  watch: {
    userImage() {
      this.base64Image = this.userImage
    }
  },
  mounted() {
    if (this.userImage) {
      this.base64Image = this.userImage
    }
  },
  methods: {
    imageToBase64() {
      // Convert image to base64
      var reader = new FileReader()
      reader.readAsDataURL(this.image)
      reader.onload = () => {
        this.base64Image = reader.result
        this.$emit('input', reader.result)
      }
    },
    triggerClick() {
      this.$refs.upload.$el.click()
    }
  }
}
</script>

<style lang="scss">
  .upload.control {
    width: 100%;
  }
  
  .image-uploader {
      &__field {
        display: block;
        width: 200px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0 auto;
        background-color: #cccccc;
        border-radius: 100px;
        overflow: hidden;
        cursor: pointer;

        &.done {
          img {
            min-width: 100%;
            min-height: 100%;
          }
        }
      }

      i {
        font-size: 50px;
      }

      &:hover {
        p {
          text-decoration: underline;
        }
      }
    }
</style>
