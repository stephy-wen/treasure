<template>
  <div
    class="dropdown dropdown-member-info d-inline-flex align-items-center me-3"
  >
    <a
      class="d-flex align-items-center dropdown-toggle text-white"
      href="#"
      id="dropdownMenuMember"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <font-awesome-icon icon="fa-solid fa-circle-user" class="me-2" />
      <p class="personal-id text-center fs-6 fw-bold mb-0">{{ userId }}</p>
    </a>
    <ul
      class="dropdown-menu dropdown-menu-lg-start px-3 py-4 fw-bold"
      style="width: 250px"
      aria-labelledby="dropdownMenuMember"
    >
      <div class="text-center mt-1">
        <img
          class="img-fluid"
          style="max-width: 36px"
          :src="userAvatar"
          alt="User Avatar"
        />
        <p class="fs-6 fw-bold">
          <i class="fa-solid fa-circle-user me-2"></i>{{ userId }}
        </p>
      </div>

      <div class="personal-balance-info mt-4">
        <div class="d-flex justify-content-center align-items-center mt-3 mx-3">
          <p class="personal-balance fw-bold mb-0">
            <img
              class="me-2 img-fluid"
              style="max-width: 30px; vertical-align: middle"
              src="@/assets/images/icon/balance-icon.png"
              alt="Balance Icon"
            />
            {{ balance }}
            <a href="#">
              <img
                class="img-fluid ms-2 mb-1"
                style="max-width: 16px; vertical-align: middle"
                src="@/assets/images/icon/antOutline-eye.svg"
                alt="Eye Icon"
              />
            </a>
          </p>
        </div>
        <div class="text-center mt-1">
          <button
            class="btn btn-primary fs-6 mt-1 px-4"
            style="border-radius: 50px"
            type="button"
            @click="$emit('recharge')"
          >
            Recharge Now
          </button>
        </div>
      </div>

      <li class="mt-4">
        <a
          class="dropdown-item winnie-member-info fs-6 fw-bold"
          href="dashboard"
        >
          <img
            class="me-3 mb-1"
            style="max-width: 16px"
            src="@/assets/images/icon/md-dashboard.svg"
            alt="Dashboard Icon"
          />
          Dashboard
        </a>
      </li>
      <li class="mt-2">
        <a
          class="dropdown-item winnie-member-info fs-6 fw-bold"
          @click="$emit('logout')"
        >
          <font-awesome-icon icon="fa-solid fa-power-off" class="me-3" />
          Log Out
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    userAvatar: {
      type: String,
    },
  },
};
</script>

<style scoped>
/* 加入你的樣式或保持樣式由母組件控制 */
.dropdown-menu {
  background-color: #1e2329;
}

.collapse .dropdown-member-info p {
  color: #f8f8f8;
}

.collapse .dropdown-member-info .personal-balance {
  font-size: 1.25rem;
}

.collapse .dropdown-member-info .winnie-member-info {
  background-color: transparent;
  color: #f8f8f8;
}

.navbar .btn-primary {
  background-color: #fcd535;
  border-color: #fcd535;
  color: #181a20;
  font-weight: 600;
  border-radius: 10px;
}
</style>
