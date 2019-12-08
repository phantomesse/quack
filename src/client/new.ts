function goBackToLobby(): void {
  window.location.href = '/';
}

function createSession(): void {
  let difficulty: String = document
    .querySelector('input[name="difficulty"]:checked')
    .getAttribute('value');
  let rounds: number = parseInt(
    document
      .querySelector('input[name="rounds"]:checked')
      .getAttribute('value'),
    10
  );
  console.log({
    difficulty: difficulty,
    rounds: rounds
  });
}
