import http from '@/utils/proxy';

export default {
  getMusicUrl() {
    return http.get('/api/rand.music?type=json&sort=热歌榜');
  },
};
