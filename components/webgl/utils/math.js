export const mod = (m, n) => {
  return ((m % n) + n) % n
}

export const closestAngle = (current, snap) => {
  return Math.round(current / snap) * snap
}

export const map = (
  num,
  min1,
  max1,
  min2,
  max2,
  round = false,
  constrainMin = true,
  constrainMax = true
) => {
  if (constrainMin && num < min1) {
    return min2
  }
  if (constrainMax && num > max1) {
    return max2
  }

  const num1 = (num - min1) / (max1 - min1)
  const num2 = num1 * (max2 - min2) + min2
  if (round) {
    return Math.floor(num2)
  }
  return num2
}
