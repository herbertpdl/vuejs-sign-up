<template>
  <div class="section">
    <div class="container">
      <div class="confirm-data">
        <div class="columns">
          <div class="column is-4">
            <image-uploader
              ref="uploadImage"
              v-if="userData.image"
              v-model="userData.image"
              :userImage="userData.image"
            />

            <hr>

            <b-button
              type="is-text"
              expanded
              @click="changeImage"
            >
              Editar foto
            </b-button>

            <b-button 
              type="is-text"
              expanded
              @click="editData"
            >
              Editar perfil
            </b-button>
          </div>
          <div class="column is-8">
            <div class="confirm-data__text">
              <p v-if="userData !== {}">
                Eu me chamo {{ userData.firstName }} {{ userData.lastName }} e eu tenho {{ formatedAge }} anos
                e você pode me enviar e-mails para {{userData.email}}. Eu moro em {{userData.city}}, no
                estado do {{ userData.state.estado }}. eu gosto de {{ userData.interests.toString() }}.
                Por favor {{ !userData.wantsNewsletter ? 'não' : '' }} me envie newsletters. Para me
                contratar ligue no telefone {{userData.phone}}.
              </p>

              <b-button
                type="is-primary"
                @click="save"
              >
                Confirmar
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageUploader from '../components/image-uploader/ImageUploader'

import { saveUser } from '../services/users'

export default {
  name: 'confirm',
  components: {
    ImageUploader,
  },
  data() {
    return {
      userData: {},
    }
  },
  created() {
    this.userData = this.$store.state.userData
  },
  computed: {
    formatedAge() {
      if (this.userData.age === 0) {
        return 'entre 13 e 19'
      } else if (this.userData.age === 1) {
        return 'entre 20 e 29'
      } else if (this.userData.age === 2) {
        return 'entre 30 e 45'
      }

      return 'mais de 45'
    },
  },
  methods: {
    changeImage() {
      this.$refs.uploadImage.triggerClick()
    },
    editData() {
      this.$router.push('sign-up');
    },
    save() {
      this.$store.commit('loading', true)

      saveUser({
        image: this.userData.image,
        firstName: this.userData.name,
        lastName: this.userData.lastName,
        age: this.userData.age,
        email: this.userData.email,
        phone: this.userData.phone,
        state: this.userData.state,
        city: this.userData.city,
        address: this.userData.address,
        interests: this.userData.interests,
        wantsNewsletter: this.userData.wantsNewsletter,
      })
        .then(resp => {
          this.$store.commit('loading', false)
          this.$buefy.toast.open({
              duration: 5000,
              message: `Usuário salvo com sucesso`,
              position: 'is-bottom',
              type: 'is-success'
          })
        })
        .catch(e => {
          this.$store.commit('loading', false)
          this.$buefy.toast.open({
              duration: 5000,
              message: `Houve um erro ao salvar os dados do usuário`,
              position: 'is-bottom',
              type: 'is-danger'
          })
        })
    }
  }
}
</script>

<style lang="scss">
  .confirm-data {
    height: 80vh;
    padding: 20px 50px;
    border: 1px solid #808080;
    border-radius: 6px;

    .columns {
      height: 100%;
    }

    &__text {
      height: 100%;
      padding-left: 20px;
      border-left: 1px solid #808080;

      p {
        margin-bottom: 50px;
      }
    }
  }
</style>
