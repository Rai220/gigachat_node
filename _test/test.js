import GigaChat from 'gigachat';

const key = `eyJjdHkiOiJqd3QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.LSWT6Zr8CEchLCjX9FgttLBeGehOkwwUB9HrLlTr6BtPivIm_i805yCfB2H0MWVGgf35c0NR6vdLztguqfGF-2gKcglIddaGNdiskJCreeSP9V05_EyBgNaKmK77zHCG-PH7Lep5EHU_k3fc7Zuzl6lZMjPSc94m6qScVcTHpJKEPpGrTdsqzcgQp1xdAUE7UVkLp1PLjPFWM7lv7rT8u1ODeUPLyuVZW-7RIqzFKfmQCYv7bDsn9dUxdKkadOsRkib71avxwVAAhONsAjxI2VMCo_eEkgDOGrqCt-IU8I-Kqgfg83fx9QXAS1D7KieS3Rlpdnpe9UteOUGTaB11Kw.l-hhBEWLSUGL95DbEm6iaA.oHdKFfgciqH2y3tTnoD0iddBD_0ZeBZNoLIso0j7gzEIZQxa3mV6dQLd42cQpOnp6KjOUv9IyU9Lrm7LDsSK0qCJsrHrSs-FzKlPyjL2J34puk4kZnxzKGNUUnjXtpx1xbsK7tBZG3AFQRLO9sLoT-o_N07Pcoj6v-O6mCkwfMgK_xR79GaVLH7qVWfKm01YiRndEthl0eMSHDhE6tfab5lC7K08tLhAgDIM4GZjU6YdJyqbOmxzhGEfOfTu-yh7Yb006BclYCvcEyxXuU4zngYkJw83BAAzciM3dAY_hNtqjQyCopE76LBs1dwWrmeFp6SSMoXXOlFM6IeUvnlQG7j3gtiSQYJeCWMWy9eMnKyEWH9UM98TAUPNj6N_qHcXGfCvghvZX3Vm47v_KZX_Qc11Jm2E1VW83USfbnMdxf6pWXe5CYAHWBXMbVIFZxD2AVgftY2MtVp2NfPDaGw_l_9NavxYJxXIZ6cvSD0MukucSDvD2a04JRo5cGKbuL1BODmthZZdwdApYjhCy6lhUpk6SCZ62WOup4XP49m03YBNMLQAedfzD5L-e8pc6rLFXY-h5A3dhWLCbyrDrRwItA0IJyn_y2S9T-mYk34iy58VVGBkbfIiI2XTlU8xokIdYtH7VhNCfx_KreUiRhtpxVsrqwyj1efIasvWb1zKomCzHgWZ8O8CDB0Gb5SnpjYLjaoBimOVXyEZJce3gNYH-Aomdcagepzx4PuCqY7DfX8.jGgpBxkJOErfJouvY32NYePZMKETwGHGVoEYk8p-EDA`;

const client = new GigaChat({
  apiKey: key,
});

async function main() {
  const ans = await client.chat.completions.create({
    model: 'GigaChat',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: false,
  });
  console.info(ans);
  console.info(ans.choices);
}

main();
