export const formatDate = (data) => {
  const date = new Date(data);
  const year = date.getFullYear();
  // getMonth()は0から始まるので1を足す
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // テンプレートリテラルを使用してフォーマットされた文字列を返す
  return `${year}/${month}/${day}`;
}

