<template>
  <div class="eta 307">
    <div class="bus-number">{{ number }}</div>
    <div class="from-to-container">
      <div class="from-to">
        {{ from }}
        <span class="icon"><font-awesome-icon icon="angle-right"/></span>
        {{ to }}
      </div>
      <div class="eta-stop">({{ etaStop }})</div>
    </div>
    <div class="eta-min">
      {{ etaParsed }}
    </div>
    <div class="provider">
      <img
        v-if="isCTB"
        src="https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/f8/fe/b9/f8feb960-362c-064e-905f-103a3571a001/source/512x512bb.jpg?w=200"
      />
      <img
        v-else
        src="https://lh3.googleusercontent.com/M8q3UWGb7LhaCViShhXX9BZus7BSdVMEJfNFDdnpwWL7a4XCYPp7V_we4eXg9Yb5do0"
      />
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Eta",
  props: {
    number: String,
    from: String,
    to: String,
    etaStop: String
  },
  data() {
    return {
      eta: "-",
      interval: null
    };
  },
  methods: {
    async updateEta() {
      const res = await axios({
        method: "post",
        url: "http://localhost:8081",
        data: {
          number: this.number,
          from: this.from,
          to: this.to,
          etaStop: this.etaStop
        }
      });
      if (res && res.data && res.data.success) {
        try {
          this.eta = res.data.etas[0];
        } catch (e) {
          this.eta = "-";
        }
      }
    }
  },
  computed: {
    isCTB() {
      return this.eta.includes("城巴");
    },

    etaParsed() {
      return this.eta.replace("城巴", "");
    }
  },
  async mounted() {
    this.updateEta();
    this.interval = setInterval(() => {
      this.updateEta();
    }, 60 * 1000);
  },

  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style lang="scss" scoped>
.eta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  font-size: 5rem;

  &:not(:first-child) {
    border-top: 1px solid #eee;
  }

  &:nth-child(even) {
    background-color: #ffe9e9;
  }

  .bus-number {
    padding-right: 64px;
  }

  .from-to-container {
    margin-right: auto;

    .from-to {
      font-size: 3.5rem;

      span {
        font-size: 3rem;
        color: #868686;
        margin: 0 16px;
      }
    }

    .eta-stop {
      //text-align: center;
      font-size: 3rem;
    }
  }

  .eta-min {
    font-size: 3.5rem;
    margin-right: 32px;
  }

  .provider {
    img {
      width: 120px;
      vertical-align: middle;
      border-radius: 20px;
      overflow: hidden;
    }
  }
}
</style>
