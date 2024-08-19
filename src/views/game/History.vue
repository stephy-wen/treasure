<template>
  <div class="leaderboard-container">
    <h2 class="fw-bold mb-3">History</h2>
    <table class="table table-borderless fw-bold custom-rounded">
      <thead>
        <tr>
          <th class="text-center" scope="col">Round</th>
          <th scope="col">Winner</th>
          <th class="d-none d-sm-table-cell text-end pe-3 pe-sm-0" scope="col">
            Time
          </th>
          <th class="text-end pe-3 pe-sm-5" scope="col">Verify</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1546</th>
          <td class="leaderboard-name">
            <img
              class="img-fluid"
              src="../images/icon/NFT/09.png"
              alt=""
            />hehe15235
          </td>
          <td class="d-none d-sm-table-cell text-end pe-3 pe-sm-0">
            2024/06/13 18:24:53
          </td>
          <td class="text-end pe-3 pe-sm-5">
            <img src="../images/icon/arcoDesign-launch 1.svg" alt="" />
          </td>
        </tr>
        <tr>
          <th scope="row">1545</th>
          <td class="leaderboard-name">
            <img
              class="img-fluid"
              src="../images/icon/NFT/01.png"
              alt=""
            />1515djijiedd
          </td>
          <td class="d-none d-sm-table-cell text-end pe-3 pe-sm-0">
            2024/06/12 20:16:03
          </td>
          <td class="text-end pe-3 pe-sm-5">
            <img src="../images/icon/arcoDesign-launch 1.svg" alt="" />
          </td>
        </tr>
        <tr>
          <th scope="row">1544</th>
          <td class="leaderboard-name">
            <img
              class="img-fluid"
              src="../images/icon/NFT/02.png"
              alt=""
            />ohjiemdl88556
          </td>
          <td class="d-none d-sm-table-cell text-end pe-3 pe-sm-0">
            2024/06/11 07:33:12
          </td>
          <td class="text-end pe-3 pe-sm-5">
            <img src="../images/icon/arcoDesign-launch 1.svg" alt="" />
          </td>
        </tr>
        <tr>
          <th scope="row">1543</th>
          <td class="leaderboard-name">
            <img
              class="img-fluid"
              src="../images/icon/NFT/03.png"
              alt=""
            />o45jhji3n56
          </td>
          <td class="d-none d-sm-table-cell text-end pe-3 pe-sm-0">
            2024/06/08 22:11:17
          </td>
          <td class="text-end pe-3 pe-sm-5">
            <img src="../images/icon/arcoDesign-launch 1.svg" alt="" />
          </td>
        </tr>
        <tr>
          <th scope="row">1542</th>
          <td class="leaderboard-name">
            <img
              class="img-fluid"
              src="../images/icon/NFT/04.png"
              alt=""
            />hellokittyomg
          </td>
          <td class="d-none d-sm-table-cell text-end pe-3 pe-sm-0">
            2024/06/03 12:23:11
          </td>
          <td class="text-end pe-3 pe-sm-5">
            <img src="../images/icon/arcoDesign-launch 1.svg" alt="" />
          </td>
        </tr>
        <tr>
          <th scope="row">1541</th>
          <td class="leaderboard-name">
            <img
              class="img-fluid"
              src="../images/icon/NFT/05.png"
              alt=""
            />goodmorning
          </td>
          <td class="d-none d-sm-table-cell text-end pe-3 pe-sm-0">
            2024/06/03 12:23:11
          </td>
          <td class="text-end pe-3 pe-sm-5">
            <img src="../images/icon/arcoDesign-launch 1.svg" alt="" />
          </td>
        </tr>
        <tr>
          <th scope="row">1540</th>
          <td class="leaderboard-name">
            <img
              class="img-fluid"
              src="../images/icon/NFT/06.png"
              alt=""
            />48e8ddtgtgg
          </td>
          <td class="d-none d-sm-table-cell text-end pe-3 pe-sm-0">
            2024/06/03 12:23:11
          </td>
          <td class="text-end pe-3 pe-sm-5">
            <img src="../images/icon/arcoDesign-launch 1.svg" alt="" />
          </td>
        </tr>
        <tr>
          <th scope="row">1539</th>
          <td class="leaderboard-name">
            <img
              class="img-fluid"
              src="../images/icon/NFT/07.png"
              alt=""
            />ddeehyh74
          </td>
          <td class="d-none d-sm-table-cell text-end pe-3 pe-sm-0">
            2024/06/03 12:23:11
          </td>
          <td class="text-end pe-3 pe-sm-5">
            <img src="../images/icon/arcoDesign-launch 1.svg" alt="" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup></script>

<style scoped>
.leaderboard-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  height: auto;
  margin-bottom: 20px;
}

.leaderboard-btn button {
  flex: 1;
  padding: 5px 30px;
  border-radius: 4px;
  border: none;
  background-color: #2b3139;
  color: #f8f8f8;
}

.leaderboard-btn button:hover {
  background-color: #414d5a;
}

.leaderboard-container .table {
  --bs-table-bg: #1e2329;
  color: #f8f8f8;
  --bs-table-color: none;
  width: 100%;
  margin: 0;
}

.leaderboard-container .table th,
.leaderboard-container .table td {
  vertical-align: middle;
}

.leaderboard-container thead {
  color: #bbb;
}

.leaderboard-container .table tbody tr th {
  color: #bbb;
  text-align: center;
}

.leaderboard-container .table tbody tr:hover {
  background-color: #414d5a;
}

.leaderboard-container .table img {
  max-width: 35px;
  margin-right: 10px;
}

.custom-rounded {
  border-radius: 15px;
  overflow: hidden;
}

@media (max-width: 767.98px) {
  .leaderboard-container .table {
    --bs-table-bg: none;
  }
  .leaderboard-container .table img {
    max-width: 24px;
  }
  .leaderboard-name {
    font-size: 0.75rem;
  }
  .leaderboard-container .table img {
    margin-right: 5px;
  }
}
</style>
