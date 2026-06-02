import { NextRequest, NextResponse } from 'next/server';
import { runForecast } from '@/lib/forecast/engine';
import { defaultAssumptions } from '@/lib/assumptions';
import { resources, skillMappings, productivityWeights, currentWorkload } from '@/data';
import type { DemandScenario, Assumptions } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { scenario: DemandScenario; assumptions?: Partial<Assumptions> };
    const assumptions = { ...defaultAssumptions, ...body.assumptions };
    const baseline = { resources, skillMappings, productivityWeights, currentWorkload };
    const result = runForecast(body.scenario, baseline, assumptions);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 });
  }
}
