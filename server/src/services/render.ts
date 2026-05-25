const RENDER_API_KEY = process.env.RENDER_API_KEY || ''
const RENDER_SERVICE_ID = process.env.RENDER_SERVICE_ID || ''

interface DeployResult {
  jobId: string
  status: 'pending' | 'building' | 'live' | 'failed'
  url: string
}

export async function deployToRender(_html: string, _id: string): Promise<DeployResult> {
  if (!RENDER_API_KEY || !RENDER_SERVICE_ID) {
    return {
      jobId: 'local-' + Date.now(),
      status: 'live',
      url: `http://localhost:3001/api/preview/${_id}`,
    }
  }

  try {
    // Trigger Render deploy hook
    const response = await fetch(
      `https://api.render.com/v1/services/${RENDER_SERVICE_ID}/deploys`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RENDER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clearCache: 'clear' }),
      },
    )

    if (!response.ok) {
      throw new Error(`Render API error: ${response.status}`)
    }

    const data = await response.json() as { id: string; deploy?: { status: string } }
    return {
      jobId: data.id,
      status: 'pending',
      url: `https://ai-landing-gen.onrender.com/preview/${_id}`,
    }
  } catch (err) {
    console.error('Render deploy failed:', err)
    return {
      jobId: 'error-' + Date.now(),
      status: 'failed',
      url: '',
    }
  }
}
