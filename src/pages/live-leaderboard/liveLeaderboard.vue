<template>
  <ModalsContainer />
  <div class="live-leaderboard-page">
    <VueFinalModal
      :teleportTo="false"
      v-model="isModalOpen"
      content-class="live-leaderboard-modal"
      swipe-to-close="down"
      content-transition="vfm-slide-down"
      overlay-transition="vfm-fade"
    >
      <div class="header-container">
        <div class="tab-container">
          <div
            class="tab-item"
            :class="{ active: activeTab === 'contribution' }"
            @click="activeTab = 'contribution'"
          >
            贡献榜
          </div>
          <div
            class="tab-item"
            :class="{ active: activeTab === 'charm' }"
            @click="activeTab = 'charm'"
          >
            魅力榜
          </div>
        </div>
        <div class="time-selector">
          <div
            class="time-item"
            :class="{ active: activeTime === 'today' }"
            @click="activeTime = 'today'"
          >
            今日
          </div>
          <div
            class="time-item"
            :class="{ active: activeTime === 'week' }"
            @click="activeTime = 'week'"
          >
            本周
          </div>
          <div
            class="time-item"
            :class="{ active: activeTime === 'month' }"
            @click="activeTime = 'month'"
          >
            本月
          </div>
        </div>
      </div>
      <div class="show-container">
        <div class="show-item first-top-container" v-if="top3Users[0]">
          <div class="avatar-container">
            <img class="avatar-img" :src="top3Users[0].headUrl" :alt="top3Users[0].nickname" />
            <img class="crown-img" src="@/assets/live-leaderboard/crown1.png" alt="" />
            <img
              class="level-number-img"
              src="@/assets/live-leaderboard/level-number-1.png"
              alt=""
            />
          </div>
          <div class="user-name-container">
            <div class="user-name">{{ top3Users[0].nickname }}</div>
            <div class="number-button">{{ top3Users[0].value }}榜单值</div>
          </div>
        </div>
        <div class="show-item second-top-container" v-if="top3Users[1]">
          <div class="avatar-container">
            <img class="avatar-img" :src="top3Users[1].headUrl" :alt="top3Users[1].nickname" />
            <img class="crown-img" src="@/assets/live-leaderboard/crown2.png" alt="" />
            <img
              class="level-number-img"
              src="@/assets/live-leaderboard/level-number-2.png"
              alt=""
            />
          </div>
          <div class="user-name-container">
            <div class="user-name">{{ top3Users[1].nickname }}</div>
            <div class="number-button">{{ top3Users[1].value }}榜单值</div>
          </div>
        </div>
        <div class="show-item third-top-container" v-if="top3Users[2]">
          <div class="avatar-container">
            <img class="avatar-img" :src="top3Users[2].headUrl" :alt="top3Users[2].nickname" />
            <img class="crown-img" src="@/assets/live-leaderboard/crown3.png" alt="" />
            <img
              class="level-number-img"
              src="@/assets/live-leaderboard/level-number-3.png"
              alt=""
            />
          </div>
          <div class="user-name-container">
            <div class="user-name">{{ top3Users[2].nickname }}</div>
            <div class="number-button">{{ top3Users[2].value }}榜单值</div>
          </div>
        </div>
      </div>
      <div class="list-container">
        <div class="list-item" v-for="user in listUsers" :key="user.id">
          <div class="rank-number">{{ user.rank }}</div>
          <div class="user-info">
            <img class="list-avatar" :src="user.headUrl" :alt="user.nickname" />
            <div class="user-details">
              <div class="user-name">{{ user.nickname }}</div>
              <div class="user-tags">
                <span class="gender-tag"
                  >{{ formatGender(user.gender) }} {{ user.nobleInfo?.level || 0 }}</span
                >
                <span class="level-tag">Lv.{{ user.nobleInfo?.level || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="score-value">榜单值：{{ user.value }}</div>
        </div>
      </div>
      <div class="footer-container" v-if="leaderboardData.myInfo">
        <div class="list-item">
          <div class="rank-number">{{ leaderboardData.myInfo.rank }}</div>
          <div class="user-info">
            <img class="list-avatar" :src="leaderboardData.myInfo.headUrl" />
            <div class="user-details">
              <div class="user-name">{{ leaderboardData.myInfo.nickname }}</div>
              <div class="user-tags">
                <span class="gender-tag"
                  >{{ formatGender(leaderboardData.myInfo.gender) }}
                  {{ leaderboardData.myInfo.nobleInfo?.level || 0 }}</span
                >
                <span class="level-tag">Lv.{{ leaderboardData.myInfo.nobleInfo?.level || 0 }}</span>
              </div>
            </div>
          </div>
          <div class="score-value">榜单值：{{ leaderboardData.myInfo.value }}</div>
        </div>
      </div>
    </VueFinalModal>
  </div>
</template>

<script setup>
import { ModalsContainer, useModal, VueFinalModal } from 'vue-final-modal'
import { ref, onMounted, watch, computed } from 'vue'
import './live-leaderboard.css'
import useFetch from '@/shared/utils/useFetch.js'

const isModalOpen = ref(true)
const activeTab = ref('contribution') // 'contribution' | 'charm'
const activeTime = ref('month') // 'today' | 'week' | 'month'

const rankingTypeMap = {
  contribution: 1,
  charm: 2,
}

const timeTypeMap = {
  today: 5,
  week: 6,
  month: 10,
}

const genderMap = {
  1: '♂',
  2: '♀',
  0: '?',
}

const rankingType = computed(() => {
  return rankingTypeMap[activeTab.value]
})

const timeType = computed(() => {
  return timeTypeMap[activeTime.value]
})

// 响应式数据存储
const leaderboardData = ref({
  userList: [],
  myInfo: null,
  endTime: null,
})

// 获取榜单数据
const fetchLeaderboardData = async () => {
  try {
    const res = await useFetch(
      `/api/v1/platform-ranking/list/${rankingType.value}/${timeType.value}`,
      {
        method: 'POST',
      },
    )

    if (res.code === 200) {
      leaderboardData.value = res.data
      console.log('榜单数据:', leaderboardData.value)
    }
  } catch (error) {
    console.error('获取榜单数据失败:', error)
  }
}

// 初始加载数据
fetchLeaderboardData()

// 计算属性：获取前三名用户
const top3Users = computed(() => {
  const userList = leaderboardData.value.userList || []
  return [
    userList.find((user) => user.rank === 1) || null, // 第一名
    userList.find((user) => user.rank === 2) || null, // 第二名
    userList.find((user) => user.rank === 3) || null, // 第三名
  ]
})

// 计算属性：获取榜单列表（排除前三名）
const listUsers = computed(() => {
  const userList = leaderboardData.value.userList || []
  return userList.filter((user) => user.rank > 3)
})

// 格式化性别显示
const formatGender = (gender) => {
  return genderMap[gender] || '?'
}

const liveLeaderboard = {
  contribution: {
    bg: `url('/src/assets/live-leaderboard/contribution-leaderboard-bg.png')`,
  },
  charm: {
    bg: `url('/src/assets/live-leaderboard/charm-leaderboard-bg.png')`,
  },
}

// 监听tab和时间切换，重新获取数据
watch([activeTab, activeTime], () => {
  fetchLeaderboardData()
})

watch(
  activeTab,
  (newVal) => {
    document.documentElement.setAttribute('type', newVal)
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  setTimeout(() => {
    let liveLeaderboardModal = document.querySelector('.live-leaderboard-modal')
    liveLeaderboardModal.style.zoom = window.innerWidth / 500
    window.addEventListener('resize', () => {
      liveLeaderboardModal.style.zoom = window.innerWidth / 500
    })
  })
})
</script>

<style>
.live-leaderboard-modal {
  position: absolute;
  bottom: 0;
  background-image: v-bind('liveLeaderboard[activeTab].bg');
  background-size: 100%;
  background-repeat: no-repeat;
  width: 500px;
  height: 850px;
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

<style scoped>
.live-leaderboard-page {
  width: 100%;
  height: 100%;
  background-color: var(--primary-bg-color);

  .header-container {
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: space-between;
    align-items: center;

    .tab-container {
      display: flex;
      gap: 50px;
      color: rgba(255, 255, 255, 0.5);
      .tab-item {
        font-size: 23px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
          font-weight: 600;
          color: #ffffff;
        }
      }
    }

    .time-selector {
      display: flex;
      background: rgba(0, 0, 0, 0.5);
      border-radius: var(--border-radius);

      backdrop-filter: blur(10px);
      color: rgba(255, 255, 255, 0.5);

      .time-item {
        padding: 12px 26px;
        font-size: 18px;
        cursor: pointer;
        border-radius: var(--border-radius);
        transition: all 0.3s ease;
        white-space: nowrap;

        &.active {
          background: var(--time-selector-active-bg);
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
  }

  .show-container {
    height: 350px;
    flex-shrink: 0;
    position: relative;
    .show-item {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 30px;

      .avatar-container {
        position: relative;
        .avatar-img {
          border-radius: 50%;
        }
        .crown-img {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -50%);
        }
        .level-number-img {
          width: 40px;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%);
        }
      }
      .user-name-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .user-name {
          font-size: 16px;
        }
        .number-button {
          font-size: 16px;
          padding: 6px 10px;
          background: var(--number-button-bg);
          border-radius: var(--border-radius);
        }
      }

      &.first-top-container {
        align-items: center;
        top: 12.2%;
        left: 51.7%;
        transform: translateX(-50%);
        .avatar-container {
          .avatar-img {
            width: 125px;
          }
          .crown-img {
            width: 50px;
          }
        }
        .user-name-container {
          align-items: center;
        }
      }
      &.second-top-container {
        align-items: start;
        top: 42.9%;
        left: 4.3%;

        .avatar-container {
          .avatar-img {
            width: 100px;
          }
          .crown-img {
            width: 40px;
          }
        }
        .user-name-container {
          align-items: start;
        }
      }
      &.third-top-container {
        align-items: end;
        top: 39.5%;
        right: 4.1%;
        align-items: end;

        .avatar-container {
          .avatar-img {
            width: 100px;
          }
          .crown-img {
            width: 40px;
          }
        }
        .user-name-container {
          align-items: end;
        }
      }
    }
  }
  .list-container {
    flex-grow: 1;
    padding: 0 16px;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  .list-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 12px 16px;

    .rank-number {
      font-size: 20px;
    }

    .user-info {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 12px;

      .list-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .user-details {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .user-name {
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 120px;
        }

        .user-tags {
          display: flex;
          gap: 6px;

          .gender-tag,
          .level-tag {
            font-size: 12px;
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: 500;
          }

          .gender-tag {
            background: #36BCFF;
            color: white;
          }

          .level-tag {
            background: linear-gradient(90deg, #FFE538 8.22%, #FF6D00 100%);

            color: white;
          }
        }
      }
    }

    .score-value {
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      margin-left: auto;
    }
  }
  .footer-container {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 100px;
    background: var(--footer-container-bg);

    border-radius: 20px 20px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .list-item {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
