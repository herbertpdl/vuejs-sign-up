<template>
  <div class="tag-input">
    <b-field label="Interesses">
        <b-input
          v-model="text"
          @keyup.native="handleTags"
          :custom-class="inputClass"
        />
    </b-field>
    <p v-if="showNameValidationMessage" class="help is-danger">
      Este campo é obrigatório
    </p>
    <div v-if="tags.length > 0" class="tag-input__tags-wrapper">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="tag-input__tag"
      >
        <span>
          {{ tag.trim() }}
        </span>
        <i class="ri-close-circle-fill" @click="removeTag(index)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tag-input',
  props: {
    interests: Array
  },
  data() {
    return {
      text: '',
      tags: [],
      inputClass: null,
      showNameValidationMessage: false,
    }
  },
  watch: {
    tags() {
      this.validate()
    },
    interests() {
      this.handleTags()
    }
  },
  mounted() {
    if (this.interests.length > 0) {
      console.log(this.interests)
      this.handleTags()
    }
  },
  methods: {
    handleTags(event) {
      // Add a new tag whenever user press ","
      if ( event && event.key === ',') {
        const arrayValues = this.text.split(',')
        this.tags = arrayValues.filter(val => val.trim() !== '')
        this.$emit('input', this.tags)
      } else if (this.interests.length > 0 && this.interests !== this.tags) {
        this.text = this.interests.toString()
        const arrayValues = this.text.split(',')
        this.tags = arrayValues.filter(val => val.trim() !== '')
      }
    },
    removeTag(index) {
      // Remove tag from given index
      this.tags.splice(index, 1)
      this.text = this.tags.toString()
      this.$emit('input', this.tags)
    },
    validate() {
      if (this.tags.length === 0) {
        this.inputClass = 'is-danger'
        this.showNameValidationMessage = true
        return
      }

      this.inputClass = ''
      this.showNameValidationMessage = false
    }
  }
}
</script>

<style lang="scss">
  .tag-input {
    &__tags-wrapper {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    &__tag {
      display: flex;
      align-items: center;
      width: fit-content;
      margin: 0 4px 8px 4px;
      padding: 4px 8px;
      border-radius: 4px;
      background-color: #f5f5f5;
      line-height: 100%;

      span {
        margin-right: 8px;
      }

      i {
        cursor: pointer;
      }
    }
  }
</style>
