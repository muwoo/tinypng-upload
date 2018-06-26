/**
 * @user monkeywang
 * @author muwoo
 * Date: 2018/6/26
 */
export const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
