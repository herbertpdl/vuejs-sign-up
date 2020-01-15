<template>
  <section class="section">
    <div class="sign-up">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            <div class="sign-up__image-upload">

            </div>
          </div>
          <div class="column is-8">
            <!-- Name -->
            <div class="columns">
              <div class="column is-5">
                <div class="sign-up__register-form">
                  <b-field label="Primeiro nome">
                    <b-input v-model="name" type="text" placeholder="Nome" />
                  </b-field>
                </div>
              </div>
              <div class="column is-5">
                <div class="sign-up__register-form">
                  <b-field label="Sobrenome">
                    <b-input v-model="lastName" type="text" placeholder="Sobrenome" />
                  </b-field>
                </div>
              </div>
            </div>

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

            <!-- E-mail -->
            <div class="columns">
              <div class="column is-7">
                <b-field label="Email">
                  <b-input
                    v-model="email"
                    type="email" 
                    placeholder="Ex: nome@dominio.com"
                  />
                </b-field>
              </div>
            </div>

            <!-- Phone -->
            <div class="columns">
              <div class="column is-7">
                <b-field label="Telefone">
                  <the-mask
                    v-model="phone"
                    type="text"
                    placeholder="(11) 11111-1111"
                    :mask="['(##) #####-####', '(##) ####-####']"
                    :class="'input'"
                  />
                </b-field>
              </div>
            </div>

            <!-- State -->
            <div class="columns">
              <div class="column is-7">
                <b-field label="Estado">
                  <b-select
                    v-model="state"
                    placeholder="Selecione um estado"
                    expanded
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

            <!-- City -->
            <div class="columns">
              <div class="column is-7">
                <b-field label="Cidade">
                  <b-select
                    v-model="city" 
                    placeholder="Selecione uma cidade"
                    :disabled="citiesList.length < 1"
                    expanded
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
                <b-field v-if="addressType !== null">
                  <b-input
                    v-model="address"
                    type="text" 
                    :placeholder="adressPlaceholder"
                  />
                </b-field>
              </div>
            </div>

            <!-- Newsletter confirmation -->
            <b-field>
              <b-checkbox v-model="wantsNewsletter">
                Desejo receber novidades por e-mail.
              </b-checkbox>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mask } from 'vue-the-mask'

import { getStates, getCities } from '../services/brasil'

export default {
  name: 'sign-up',
  directives: {
    mask,
  },
  data() {
    return {
      statesList: [],
      citiesList: [],
      addressType: null,
      name: null,
      lastName: null,
      age: null,
      email: null,
      phone: null,
      state: null,
      city: null,
      address: null,
      wantsNewsletter: false,
    }
  },
  watch: {
    state(newValue) {
      getCities(newValue.id).then(resp => this.citiesList = resp)
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
    }
  }
}
</script>

<style lang="scss">
  .sign-up {
    &__register-form {
      margin-left: 2px solid #808080;
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
