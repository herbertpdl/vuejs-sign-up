<template>
  <section class="section">
    <div class="sign-up">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            <b-field>
              <b-upload
                v-model="image"
                @input="imageToBase64"
                accept="image/*"
              >
                <div v-if="image === null" class="sign-up__image-upload">
                  <i class="ri-user-3-line" />
                  <p>Adicionar uma foto</p>
                </div>

                <div v-else class="sign-up__image-upload done">
                  <img :src="base64Image" />
                </div>
              </b-upload>
            </b-field>
          </div>
          <div class="column is-8">
            <div class="sign-up__register-form">
              <!-- Name -->
              <div class="columns">
                <div class="column is-5">
                  <b-field label="Primeiro nome">
                    <b-input
                      ref="firstName"
                      v-model="name"
                      type="text"
                      placeholder="Nome"
                      required
                      :validation-message="requiredFieldMessage"
                    />
                  </b-field>
                  <p v-if="showNameValidationMessage" class="help is-danger">
                    Este campo pode conter apenas letras e deve conter no máximo 20 caracteres.
                  </p>
                </div>
                <div class="column is-5">
                  <b-field label="Sobrenome">
                    <b-input
                      ref="lastName"
                      v-model="lastName"
                      type="text"
                      placeholder="Sobrenome"
                      required
                      :validation-message="requiredFieldMessage"
                    />
                  </b-field>
                </div>
              </div>

              <hr>

              <!-- Age -->
              <div class="columns">
                <div class="column is-10">
                  <b-field label="Idade">
                    <b-slider
                      rounded
                      aria-label="Fan"
                      size="is-medium"
                      :min="0"
                      :max="3"
                      :tooltip="false"
                    >
                      <b-slider-tick :value="0">13-19</b-slider-tick>
                      <b-slider-tick :value="1">20-29</b-slider-tick>
                      <b-slider-tick :value="2">30-45</b-slider-tick>
                      <b-slider-tick :value="3">45 e acima</b-slider-tick>
                    </b-slider>
                  </b-field>
                </div>
              </div>

              <hr>

              <!-- E-mail -->
              <div class="columns">
                <div class="column is-7">
                  <b-field label="Email">
                    <b-input
                      ref="email"
                      v-model="email"
                      type="email" 
                      placeholder="Ex: nome@dominio.com"
                      required
                      :validation-message="requiredFieldMessage"
                    />
                  </b-field>
                </div>
              </div>

              <hr>

              <!-- Phone -->
              <div class="columns">
                <div class="column is-7">
                  <b-field label="Telefone">
                    <b-input
                      ref="phone"
                      v-model="phone"
                      type="text"
                      placeholder="(11) 11111-1111"
                      v-mask="['(##) #####-####', '(##) ####-####']"
                      required
                      :validation-message="requiredFieldMessage"
                    />
                  </b-field>
                </div>
              </div>

              <hr>

              <!-- State -->
              <div class="columns">
                <div class="column is-7">
                  <b-field label="Estado">
                    <b-select
                      ref="state"
                      v-model="state"
                      placeholder="Selecione um estado"
                      expanded
                      required
                    >
                      <option 
                        v-for="state in statesList"
                        :key="state.id"
                        :value="state"
                      >
                        {{ state.estado }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>

              <hr>

              <!-- City -->
              <div class="columns">
                <div class="column is-7">
                  <b-field label="Cidade">
                    <b-select
                      ref="city"
                      v-model="city" 
                      placeholder="Selecione uma cidade"
                      :disabled="citiesList.length < 1"
                      expanded
                      required
                    >
                      <option
                        v-for="city in citiesList"
                        :key="city.id"
                        :value="city.cidade"
                      >
                        {{ city.cidade }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>

              <hr>

              <!-- Address -->
              <div class="columns">
                <div class="column is-7">
                  <b-field label="Endereço">
                    <div class="block">
                      <b-radio 
                        v-model="addressType"
                        name="addressType"
                        native-value="casa"
                      >
                        Casa
                      </b-radio>
                      <b-radio 
                        v-model="addressType"
                        name="addressType"
                        native-value="empresa"
                      >
                        Empresa
                      </b-radio>
                    </div>
                  </b-field>

                  <transition name="fade">
                    <b-field v-if="addressType !== null">
                      <b-input
                        v-model="address"
                        ref="address"
                        type="text" 
                        :placeholder="adressPlaceholder"
                        required
                        :validation-message="requiredFieldMessage"
                      />
                    </b-field>
                  </transition>
                </div>
              </div>

              <hr>

              <!-- Interests -->
              <div class="columns">
                <div class="column is-7">
                  <tag-input v-model="interests" ref="tags" />
                </div>
              </div>

              <hr>

              <!-- Newsletter confirmation -->
              <div class="columns">
                <div class="column is-6">
                  <b-field>
                    <b-checkbox v-model="wantsNewsletter">
                      Desejo receber novidades por e-mail.
                    </b-checkbox>
                  </b-field>
                </div>
              </div>

              <b-button
                type="is-primary"
                @click="validateBeforeSubmit"
              >
                Salvar
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mask } from 'vue-the-mask'

import { ValidationObserver } from 'vee-validate';
import TagInput from '../components/tag-input/TagInput'

import { getStates, getCities } from '../services/brasil'

export default {
  name: 'sign-up',
  directives: {
    mask,
  },
  components: {
    ValidationObserver,
    TagInput,
  },
  data() {
    return {
      statesList: [],
      citiesList: [],
      addressType: 'casa',
      image: null,
      base64Image: null,
      name: '',
      lastName: null,
      age: null,
      email: null,
      phone: null,
      state: null,
      city: null,
      address: null,
      interests: [],
      wantsNewsletter: false,
      requiredFieldMessage: 'Este campo é obrigatório',
      showNameValidationMessage: false,
    }
  },
  watch: {
    state(newValue) {
      // Set the global value of loading as true
      // while fetching data
      this.$store.commit('loading', true)

      getCities(newValue.id)
        .then(resp => {
          this.citiesList = resp
          this.$store.commit('loading', false)
        })
        .catch(e => {
          this.$store.commit('loading', false)
        })
    },
    name() {
      this.validateName();
    }
  },
  mounted() {
    getStates().then(resp => this.statesList = resp)
  },
  computed: {
    adressPlaceholder() {
      return this.addressType === 'casa' ? 
        'Insira seu endereço residencial' : 
        'Insira seu endereço comercial'
    },
  },
  methods: {
    imageToBase64() {
      // Convert image to base64
      var reader = new FileReader()
      reader.readAsDataURL(this.image)
      reader.onload = () => {
        this.base64Image = reader.result       
      }
    },
    validateName() {
      // Validate first name field using regex
      const regex = /^[a-zA-Z.]{0,20}$/

      if (this.name.search(regex) === -1) {
        this.showNameValidationMessage = true
        return false
      }

      this.showNameValidationMessage = false
      return true
    },
    validateBeforeSubmit() {
      // Validate all fields before submit
      // TODO: Use validation with a library instead manually
      // for better code organization

      this.validateName()
      this.$refs.firstName.checkHtml5Validity()
      this.$refs.lastName.checkHtml5Validity()
      this.$refs.email.checkHtml5Validity()
      this.$refs.phone.checkHtml5Validity()
      this.$refs.state.checkHtml5Validity()
      this.$refs.city.checkHtml5Validity()
      this.$refs.address.checkHtml5Validity()
      this.$refs.tags.validate()
    }
  }
}
</script>

<style lang="scss">
  .sign-up {

    .upload.control {
      width: 100%;
    }

    &__image-upload {
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

      i {
        font-size: 50px;
      }

      &:hover {
        p {
          text-decoration: underline;
        }
      }
    }

    &__register-form {
      padding: 20px 50px;
      border: 1px solid #808080;
      border-radius: 6px;

      hr {
        margin: 10px 0;
      }
    }

    // Overwrite default component style
    .b-slider.is-medium {
      .b-slider-tick-label {
        white-space: nowrap;
        top: 15px;
      }
    }
  }
</style>
